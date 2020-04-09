const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")
const pdf = require("html-pdf");
const inquirer = require("inquirer");
const axios = require("axios")



let student = 
    {
    userName: "",
    avatar: "" ,
    repos: "", 
    followers: "",
    following: "",
    };

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
                student.name = res.data.login
                student.avatar = res.data.avatar_url
                student.repos = res.data.public_repos
                student.followers = res.data.followers
                student.following = res.data.following
                createPDF()
            })

     })

    



const createPDF = () => {
    app.use(express.static((__dirname, 'public')));
    ejs.renderFile(path.join(__dirname, './views/', "index.ejs"), {student: student}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let options = {
                "height": "8.70in",
                "width": "8.5in"
            };
        
            pdf.create(data, options).toFile("report.pdf");
        }
    });
}





