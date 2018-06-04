

var statVersion = 7;

function InitStat()
{
	var savedIem = localStorage.getItem("Stat");
	if(savedIem){
		try{
			var loadedStat = JSON.parse(savedIem);
		} catch(e){}
		if(loadedStat){
			if(loadedStat.version == statVersion){
				if(loadedStat.nbWin2 == undefined){//kick fix
					loadedStat.nbWin2 = 0;
				}
				if(loadedStat.wordOccurances == undefined){//kick fix
					loadedStat.wordOccurances = {};
				}
				return loadedStat;
			}
		}
	}
	var newStat = {};
	newStat.playerName = prompt("Name?");
	newStat.version = statVersion;
	newStat.winCreatures = new Array();
	newStat.nbWin = 0;
	newStat.nbWin2 = 0;
	newStat.currentCharacter = 11;
	newStat.winCreatures.push(newStat.currentCharacter);
	newStat.groundTiles = {};//key:id, value:count
	newStat.itemsTiles = {};//key:id, value:count
	newStat.worldGround = {};//key:XxY, value ground tile Id
	newStat.worldItems = {};//key:XxY, value ground tile Id
	newStat.wordOccurances = {};//number of time a word has appears
	for(var i = 0; i < 10; i++)
	{
		for(var j=0; j<10; j++)
		{
			newStat.worldGround[i + "x" + j] = 0;
		}
	}
	SaveStat(newStat);
	return newStat;
}
function SaveStat(stat){
	localStorage.setItem("Stat", JSON.stringify(stat));
}