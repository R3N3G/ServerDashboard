package routers

import (
	"html/template"
	"log"
)

func (wp *Webpage) parseHtml(htmlFile string) *template.Template {
	parsedHtml, err := template.ParseFiles(htmlFile, "templates/_base.html")
	if err != nil {
		log.Fatal(err)
	}
	return parsedHtml
}
