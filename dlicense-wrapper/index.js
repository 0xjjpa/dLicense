const go = new Go();

// Arweave HelloWASM id (testnet) = _1ECa8i8RRQ_OlRKmofSffFExdoDk3EtPYdyIXtX12g
// Arweave HelloWASM id (matic) = k8OQHZoUsGFm1XZdWa1FfU6sOSAA6gVsW9yBAWWPSzg

async function loadWasm() {
    const result = await WebAssembly.instantiateStreaming(fetch('https://arweave.net/ZeV0nyx4y61E4MgIQgnrfYSpynyMuQA12i6jAT7qwrE'), go.importObject);
    go.run(result.instance);
}

async function validateLicenseKey() {
    await loadWasm();
    const address = document.querySelector("#address").value;
    const signature = document.querySelector("#signature").value;
    console.log("Address", address);
    console.log("Signature", signature);
    if (typeof window.validateLicenseKey === "function") {
        await window.validateLicenseKey(address, signature, function(result) {
            console.log("Validation Result (inside)", result);
        });
    } else {
        console.log("validateLicenseKey function is not defined in the wasm module");
    }

}

async function runProgram() {
    await loadWasm();
    if (typeof window.runProgram === "function") {
        const programResult = await window.runProgram();
        if (programResult === "ok") {
            console.log("No issues");
        } else {
            console.log("Something happened");
        }
    } else {
        console.log("programResult function is not defined in the wasm module");
    }
}

window.validateLicenseKey = validateLicenseKey;
window.runProgram = runProgram;

// testLoadMain();