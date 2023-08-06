.PHONY: all wasm server run

all: compile server

compile: program.go main_js.go
	GOOS=js GOARCH=wasm go build -o main.wasm .
	cp "$(shell go env GOROOT)/misc/wasm/wasm_exec.js" .

server:
	python -m http.server

run: main_nojs.go
	go run main_nojs.go program.go -address 0xd837eA86bcd99b5258b1D08c1403ca77E561b71A -signature 0x691b6058d06047878a29cdabd63b7fbb4476d1907f4ac7b4180c394a34afd8a93f4f0570ae842190d021208547f3d85a0cf584936c33d86f67d1da94797ce0761b