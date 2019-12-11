import { Component, OnInit , NgZone} from '@angular/core';
import { Platform } from '@ionic/angular';
import { RecordService } from 'src/app/services/record.service';
import { RecordDummyService } from 'src/app/services/record.dummy.service';
import { Phrase } from 'src/app/models/phrase';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media , MediaObject } from '@ionic-native/media/ngx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var MediaRecorder: any;
declare var Audio: any;

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
  providers: [
    { provide: RecordService, useClass: RecordDummyService },
    TextToSpeech,
    File,
    Media,
    Platform
  ]
})
export class RecordPage implements OnInit {

  topText: Array<Phrase> = new Array();
  currentPhrase: Phrase = new Phrase('');
  bottomText: Array<Phrase> = new Array();

  // tts
  synth = window.speechSynthesis;
  voices = [];
  selectedVoice: any;


  // record android ios
  cdvPath: string;
  audioFile: MediaObject;
  mediaTimer: any;
  ampSize: number = 200;

  // record browser
  mediaRecorderBrowser: any;
  chunks = [];
  browserAudiofilesUrl: SafeUrl;

  // flag
  record = false;
  end = false;

  constructor(private media: Media, private recordService: RecordService, private tts: TextToSpeech, private file: File,
              private platform: Platform, private zone: NgZone) { }

  ngOnInit() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
    // init js web api record for desktop start and stop event save the record
    if (this.platform.is('desktop')) {
      navigator.getUserMedia(
        { audio: true },
        stream => {
          console.log(stream);
          this.mediaRecorderBrowser = new MediaRecorder(stream);
          this.mediaRecorderBrowser.onstop = e => {
            this.zone.run(() => {
              console.log('data available after MediaRecorder.stop() called.');
              this.currentPhrase.recordFile = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
              this.currentPhrase.fileName = this.createGuid();
              this.record = false;
              this.chunks = [];
              const audioURL = URL.createObjectURL(this.currentPhrase.recordFile);
              this.browserAudiofilesUrl = audioURL;
              console.log(audioURL);
              console.log('recorder stopped');
              this.playTTS().then(() => this.playCurrentRecord());
            });
          };
          // populate chunk array when record
          this.mediaRecorderBrowser.ondataavailable = e => {
            this.chunks.push(e.data);
          };
        },
        () => {
          alert('Error capturing audio browser.');
        }
      );
    }
  }

  ionViewWillEnter() {
    // @Todo passé le niveau et le code classe dans le service
    this.end = false;
    this.initText(this.recordService.getText('1', '1'));

    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
    this.playTTS();
  }
  /**
   * Init text with and array of Phrase
   * @param text Phrase
   */
  initText(text: Array<Phrase>) {
    this.topText = new Array();
    this.currentPhrase = new Phrase('');
    this.bottomText = new Array();
    this.currentPhrase = text.shift();
    this.bottomText = text;
  }

  /**
   * Next phrase
   */
  nextPhrase() {
    if (this.bottomText.length > 0) {
      this.topText.unshift(this.currentPhrase);
      this.currentPhrase = this.bottomText.shift();
      this.playTTS();
    }
  }

  /**
   * Validates record and chain the next phrase or end flag
   */
  validateRecord() {
    // @Todo passé le niveau et le code classe dans le service
    this.recordService.savePhrase(this.currentPhrase, '1', '1');
    if (this.bottomText.length > 0) {
      this.nextPhrase();
    } else {
      this.end = true;
    }
  }

  /**
   * Refuses record
   * clean current record
   */
  refuseRecord() {
    this.currentPhrase.recordFile = null;
  }

  /**
   * Play tts on current phrase js webapi if synth exist or cordova api
   */
  playTTS() {
    if (this.synth) {
      const utterThis = new SpeechSynthesisUtterance(this.currentPhrase.transcript);
      utterThis.voice = this.selectedVoice;
      const promise = new Promise((resolve, reject) => {
        utterThis.addEventListener('end', event => {
          resolve();
        }, {once: true}); // remove event after run once
        utterThis.addEventListener('error', event => {
          resolve(event);
        }, {once: true});
      });
      this.synth.speak(utterThis);
      return promise;

    } else {
      if (this.tts.speak) {
        return this.tts.speak({
          text: this.currentPhrase.transcript,
          locale: 'fr-FR'}).then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
      }
    }
  }

  /**
   * Start record with js api for browser or cordova api for mobile device
   */
  async startRecord() {
    this.record = true;
    if (!this.platform.is('desktop')) {
      let tempDirectory: string;
      let filetype: string;
      tempDirectory = this.platform.is('ios') ? this.file.tempDirectory : this.file.cacheDirectory;
      filetype = this.platform.is('ios') ? 'MathiaTempRecord.wav' : 'MathiaTempRecord.aac';
      const filePath = await this.file.createFile(tempDirectory, filetype, true);
      this.audioFile = this.media.create(tempDirectory.replace(/^file:\/\//, '') + filetype);
      this.audioFile.startRecord();
      this.cdvPath = filePath.toInternalURL();
      this.mediaTimer = setInterval(() => {
          // get media amplitude
          this.audioFile.getCurrentAmplitude().then((amp: string) => {
            this.ampSize = 200 + (Number(amp) * 100);
            console.log(amp + '%');
        });
      }, 1000);
    } else {
      this.mediaRecorderBrowser.start();
    }
  }

  /**
   * Stops record and play tts and record
   */
  stopRecord() {
    if (!this.platform.is('desktop')) {
      this.audioFile.stopRecord();
      this.record = false;
      clearInterval(this.mediaTimer);
      this.storeAudioFile();
      this.playTTS().then(() => this.playCurrentRecord());
    } else {
      this.mediaRecorderBrowser.stop();
    }
  }

  /**
   * Plays current record with js api for browser or cordova api for mobile device
   */
  playCurrentRecord() {
    if (!this.platform.is('desktop')) {
      this.audioFile.play();
    } else {
      const audio = new Audio(this.browserAudiofilesUrl);
      audio.play();
    }
  }

  /**
   * Stores audio file for ios android into current Phrase
   */
  storeAudioFile() {
    this.makeFileIntoBlob(this.cdvPath).then(
      data => {
          data.blobName = this.createGuid();
          this.currentPhrase.recordFile = data.blob;
          this.currentPhrase.fileName = this.createGuid();
      });
  }

  /**
   * Convert a file into blob
   * @param filePath string
   * @returns Promise <{ blob: Blob, blobName: string}>
   */
  makeFileIntoBlob(filePath: string): Promise<{ blob: Blob, blobName: string}> {
    return new Promise((resolve, reject) => {
        let fileName, fileExtension = '';
        this.file.resolveLocalFilesystemUrl(filePath)
            .then(fileEntry => {
                const {name, nativeURL} = fileEntry;
                // get the path..
                const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
                fileName = name;
                // if you already know the file extension, just assign it to           // variable below
                fileExtension = fileName.match(/\.[A-z0-9]+$/i)[0].slice(1);
                // we are provided the name, so now read the file into a buffer
                return this.file.readAsArrayBuffer(path, name);
            })
            .then(buffer => {
                // get the buffer and make a blob to be saved
                const medBlob: Blob = new Blob([buffer], {
                    type: `audio/${fileExtension}`
                });

                // pass back blob and the name of the file for saving
                resolve({ blob: medBlob, blobName: name});
            })
            .catch(e => reject(e));
    });
  }

  /**
   * Creates guid for filename
   * @returns guid string
   */
  createGuid(): string {
    // tslint:disable-next-line: only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line: no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
