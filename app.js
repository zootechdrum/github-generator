const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")
const pdf = require("html-pdf");
const inquirer = require("inquirer");
const axios = require("axios")

let student = [
    {
    userName: "",
    avatar: "" ,
    repos: "", 
    followers: "",
    following: "",
    stars: ""
    }
 ];

const promptUser = () => {
    return inquirer.prompt([
        {
            type:'input',
            name: "name",
            message: "What is your name"
        },
        {
            type: 'input',
            name: 'color',
            message: 'What color would you like the color of cards to be ?'
        }
    ])

}

promptUser()
    .then( (data) => {
        axios.get(`https://api.github.com/users/${data.name}`)
            .then((res) => {

                student[0].name = res.data.login
                student[0].avatar = res.data.avatar_url
                console.log(res.data.login)
                console.log(student)
                createPDF()
            })

     })

    



const createPDF = () => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {student: student}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // let options = {
            //     "height": "11.25in",
            //     "width": "8.5in",
            //     "header": {
            //         "height": "5mm"
            //     },
            //     "footer": {
            //         "height": "5mm",
            //     },
            // };
            pdf.create(data).toFile("report.pdf");
        }
    });
}

