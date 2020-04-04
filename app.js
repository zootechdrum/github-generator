const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")
let pdf = require("html-pdf");

let student = [
    {
    name: "Joy",
     email: "joy@example.com",
     city: "New York",
     country: "USA"
    }
 ];

ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {student: student}, (err, data) => {
    if (err) {
          console.log(err)
    } else {
        let options = {
            "height": "11.25in",
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

app.listen(3000);