.PHONY: all wasm server run

all: compile server

compile: program.go main_js.go
	GOOS=js GOARCH=wasm go build -o main.wasm .
	cp "$(shell go env GOROOT)/misc/wasm/wasm_exec.js" .

server:
	python -m http.server

run: main_nojs.go
	go run main_nojs.go -address 0x2464A7Ec6516ef7245EB2259BfE8FC1DD1589aB3
