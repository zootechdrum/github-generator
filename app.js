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
    }
 ];

const promptUser = () => {
    return inquirer.prompt([
        {
            type:'input',
            name: "name",
            message: "What is your GitHub  UserName"
        },
    ])

}

promptUser()
    .then( (data) => {
        axios.get(`https://api.github.com/users/${data.name}`)
            .then((res) => {
                console.log(res)
                student[0].name = res.data.login
                student[0].avatar = res.data.avatar_url
                student[0].repos = res.data.public_repos
                student[0].followers = res.data.followers
                student[0].following = res.data.following
                createPDF()
            })

     })

    



const createPDF = () => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {student: student}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let options = {
                "height": "5.25in",
                "width": "8.5in",
                "header": {
                    "height": "5mm"
                },
                "footer": {
                    "height": "5mm",
                },
            };
        
            pdf.create(data, options).toFile("report.pdf");
        }
    });
}





