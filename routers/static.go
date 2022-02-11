package routers

import (
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func (wp *Webpage) serveStatic(folder string) {
	if workDir, err := os.Getwd(); err != nil {
		log.Fatal(err)
	} else {
		filesDir := http.Dir(filepath.Join(workDir, folder))
		wp.fileServer("/"+folder, filesDir)
	}
}

func (wp *Webpage) fileServer(path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		log.Fatal("FileServer does not permit any URL parameters.")
	}
	if path != "/" && path[len(path)-1] != '/' {
		wp.Router.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"
	wp.Router.Get(path, func(w http.ResponseWriter, r *http.Request) {
		ctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(ctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}
