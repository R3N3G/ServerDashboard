package websocket

import (
	"github.com/gorilla/websocket"
)

func sendStringOverWebSocket(conn *websocket.Conn, message string) {
	conn.WriteMessage(websocket.TextMessage, []byte(message+"\n"))
}
