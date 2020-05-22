'use strict';

let Student = function(newname, newemail){
    const name = newname;
    const email = newemail;
    let homeworkResults = [];
    this.getName = function() {
        return name;
    }
    this.getEmail = function() {
        return email;
    }
    this.addHomeworkResult = function(newtopic, newsuccess) {
        const result = {
            topic: newtopic,
            success: newsuccess
        }
        homeworkResults.push(result);
    }
    this.getHomeworkResults = function() {
        const results = homeworkResults;
        return results;
    }
}

let FrontendLab = function(newlist, newlimit) {
    const list = newlist;
    const limit = newlimit;
    const students = [];
    for(let i = 0; i < list.length; i++) {
        const stud = new Student(list[i].name, list[i].email);
        students.push(stud);
    }
    this.printStudentsList = function() {
        for(let i = 0; i < students.length; i++){
            console.log(`name: ${students[i].getName()}, email: ${students[i].getEmail()}`)
            console.log(students[i].getHomeworkResults())
        }
    }
    this.addHomeworkResults = function(hwResults) {
        for(let i = 0; i < students.length; i++) {
            const student = students[i];
            for(let j = 0; j < hwResults.results.length; j++) {
                if(student.getEmail() === hwResults.results[j].email) {
                    const success = hwResults.results[j].success;
                    student.addHomeworkResult(hwResults.topic, success);
                }
            }
        }
    }
    this.printStudentsEligibleForTest = function() {
        for(let i = 0; i < students.length; i++) {
            const currentResults = students[i].getHomeworkResults();
            let range = 0;
            for(let j = 0; j < currentResults.length; j++) {
                const currentResult = currentResults[j].success;
                if(currentResult !== true) {
                    range++;
                }
            }
            if(range <= limit) {
                console.log(`name: ${students[i].getName()}, email: ${students[i].getEmail()}`);
            }
        }
    }
    
}