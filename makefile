.PHONY: all wasm server

all: compile server

compile: program.go main_js.go
	GOOS=js GOARCH=wasm go build -o main.wasm .
	cp "$(shell go env GOROOT)/misc/wasm/wasm_exec.js" .

server:
	python -m http.server
