package main

import (
	"code.unjx.de/systemo/server"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStaticRoute(t *testing.T) {
	router := server.SetupServer()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/system/static/", nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
}

func TestLiveRoute(t *testing.T) {
	router := server.SetupServer()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/system/live/", nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
}
