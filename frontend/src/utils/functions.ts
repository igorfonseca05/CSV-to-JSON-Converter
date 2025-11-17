export function handleDragEnter(e: React.DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

export function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

export function handleDragLeave(e: React.DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

export function handleDrop(e: React.DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}


export function Event(jobID: string) {
    const event = new EventSource(`http://localhost:3000/events?jobID=${jobID}`)
    return event
}





// // Cria uma nova instância de requisição
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);

    // // Acompanhar progresso de uploado do arquivo
    // xhr.upload.onprogress = (event) => {
    //   if (event.lengthComputable) {
    //     const p = Math.round((event.loaded / event.total) * 100);
    //     setProgress((prev) => prev && (p > prev ? p : prev));
    //   }
    // };

    // xhr.onload = () => {
    //   setUpload(false);
    //   setProgress(null);
    //   setFile(null);

    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     setSuccess("Upload concluído com sucesso!");
    //   } else {
    //     setError(`Erro no upload: ${xhr.status} ${xhr.statusText}`);
    //   }
    // };

    // xhr.onerror = () => {
    //   setUpload(false);
    //   setFile(null);
    //   setProgress(null);
    //   setError("Erro de rede durante o upload.");
    // };

    // xhr.send(formData);