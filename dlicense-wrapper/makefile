.PHONY: all wasm server run

all: compile server

compile: program.go main_js.go
	GOOS=js GOARCH=wasm go build -o main.wasm .
	cp "$(shell go env GOROOT)/misc/wasm/wasm_exec.js" .

server:
	python -m http.server

run: main_nojs.go
	go run main_nojs.go -key your_license_key_here
