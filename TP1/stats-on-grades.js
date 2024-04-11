const grades = new Array();

let isValide = (note) =>{
    return note >= 0 && note <= 20;
}

let generateStatsObj = function (gradesList) {

    let min = 21, max = -1, below10 =0, avg = 0;

    console.log(gradesList)
    gradesList.forEach(element => {
        min = min > element ? element : min
        max = max < element ? element : max
        if(element < 10){
            below10++;
        }
        avg += element
    });

    return {min : min, max: max, avg: (Math.round((avg/gradesList.length)*100)/100), nbBelow10: below10 };

 };

 let updateStatsDisplayed = function (statsObj) {
    document.querySelector("#minGrade td:last-child").textContent = statsObj.min
    document.querySelector("#nbGradesBelow10 td:last-child").textContent = statsObj.nbBelow10
    document.querySelector("#averageGrade td:last-child").textContent = statsObj.avg
    document.querySelector("#maxGrade td:last-child").textContent = statsObj.max

  };

document.querySelector("#addGradeBtn").addEventListener("click", ()=>{
    let note;
    note = prompt("Entrer une nouvelle note :");
    note = note == null ?null: parseFloat(note);
    let valid = isValide(note)
    console.log(valid)
    console.log
    if(note != null){
        while(!valid || isNaN(note)){
            note = prompt("Entrer une nouvelle note :");
            note = note == null ?null : parseFloat(note);
            valid = isValide(note);
            if(note == null )break;
        }
    }
    

    if(note != null && valid){
        grades.push(note);
        console.log(grades)
        updateStatsDisplayed(generateStatsObj(grades))
    }

})

