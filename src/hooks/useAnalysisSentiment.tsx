import React, { useState } from 'react'
import { ToastAndroid } from 'react-native';
import { apiAzure } from '../api/apiAzure';
import { ResponseAzureSentiment } from '../Types/interfaces';

const useAnalysisSentiment = () => {

    const [showMessage, setshowMessage] = useState<boolean>(false);
    const [commentState, setCommentState] = useState<string>("");
    const [iconstate, setIconstate] = useState<string>("");

    const HandleAnalyisText = async (text: string) => {

        // id default value

        const bodyjson: object = {
            documents: [
                {
                    language: "es",
                    id: "1",
                    text: text
                }
            ]
        }

        try {

            const response = await apiAzure.post<ResponseAzureSentiment>("/sentiment", bodyjson);

            if (response.status !== 200) {
                console.log("Error api Azure");
                ToastAndroid.show("Error Azure Service", 1000);
                return;
            }

            const data = response.data;
            const document = data.documents[0];

            setCommentState(`Comentario ${document.sentiment} - score : ${((document.confidenceScores.positive) * 10).toFixed(1)}`);

            switch (document.sentiment) {

                case "positive":
                    setIconstate("emoticon-outline");
                    break;

                case "negative":
                    setIconstate("emoticon-sad-outline");
                    break;

                default:
                    setIconstate("emoticon-neutral-outline");
                    break;
            }

            ShowToastMessage();

            return {
                calificacion: document.sentiment,
                promedio: ((document.confidenceScores.positive) * 10).toFixed(1)
            }

        } catch (err) {
            ToastAndroid.show("Error Connection ServiceA zure", 1000);
            console.log("Error useAnalysisSentiment:HandleAnalyisText");
            console.log(err);
        }

    }

    const ShowToastMessage = () => {

        setshowMessage(true);

        setTimeout(() => {
            setshowMessage(false);
        }, 3000);

    }

    return {
        showMessage,
        iconstate,
        commentState,
        HandleAnalyisText
    }

}

export default useAnalysisSentiment
