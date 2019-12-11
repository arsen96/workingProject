var versionTimestamp = "2019-11-27 15:05";
var versionCommitID = "ccebee7f1";
console.log(versionTimestamp+" ("+versionCommitID+")");
if (versionCommitID) {
    let prefix;
    if (window.Globals && Globals.LogPrefix) {
        prefix = '[' + Globals.LogPrefix + ']';
    } else {
        prefix = 'Cabri -';
    }
    console.log(prefix, 'build', versionCommitID);
}