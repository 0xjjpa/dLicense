const go = new Go();

async function loadWasm() {
    const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), go.importObject);
    go.run(result.instance);
}

async function validateLicenseKey() {
    await loadWasm();
    const licenseKey = document.querySelector("#license-key").value;
    console.log("License Key", licenseKey);
    if (typeof window.validateLicenseKey === "function") {
        const validationResult = await window.validateLicenseKey(licenseKey);
        if (validationResult === "ok") {
            console.log("License is valid");
        } else {
            console.log("License is not valid");
        }
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