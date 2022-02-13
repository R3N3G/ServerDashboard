package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func setJsonHeader(w http.ResponseWriter, httpStatusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatusCode)
}

func JsonResponse(w http.ResponseWriter, resp interface{}, httpStatusCode int) {
	setJsonHeader(w, httpStatusCode)
	jsonResp, _ := json.Marshal(resp)
	_, err := w.Write(jsonResp)
	if err != nil {
		fmt.Println(err.Error())
	}
}
