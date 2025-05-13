export const breakOnCapital = (text: string) => {
    let newText = "";

    for(let i = 0; i < text.length; i++){
        if(text[i].toUpperCase() == text[i]){
            newText += (" " + text[i])
        }else {
            newText += text[i];
        }
    }

    return newText;
} 