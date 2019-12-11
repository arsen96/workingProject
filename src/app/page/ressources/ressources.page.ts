import { Component, OnInit } from '@angular/core';
import { Ressources } from 'src/app/models/ressources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.page.html',
  styleUrls: ['./ressources.page.scss'],
})
export class RessourcesPage implements OnInit {

  constructor(private router:Router) { }

  ressources:Ressources[]

  ngOnInit() {
    this.getAllRessources()
  }

  getAllRessources(){
    this.ressources = 
    [
      {
        title:'Pieber',
        description:"CChoisir les cours c’est choisir l’assurance d’un suivi scolaire personnalisé. À Pau, Tarbes et Biarritz, Pieber aide les jeunes de la primaire au lycée à révéler le meilleur d'eux-mêmes.",
        URL:'https://www.pieber.fr/',
        image:'https://www.pieber.fr/wp-content/themes/Pieber/images/ampoule-pieber-centre-pedagogique-soutien-scolaire.png'
      },
      {
        title:'Acadomia',
        description:'Il n’y a pas d’apprentissage possible sans confiance en soi et sans désir d’apprendre. Pour certains, c’est un cercle vertueux qui se met en place dès les premières années; les bonnes notes appelant les bonnes notes et la réussite alimentant la motivation personnelle. Pour d’autres, c’est plus compliqué d’où la nécessité d’un soutien scolaire.',
        URL:'https://www.acadomia.fr/',
        image:'https://cdn-acadomia.domiagroup.com/uploads/2016/05/Cours-en-petit-groupe.jpg'
      }
    ]

    console.log('ressources',this.ressources);
    
  }
  changeURL(ressource){
    window.open(ressource.URL, '_system');
  }
  

}
