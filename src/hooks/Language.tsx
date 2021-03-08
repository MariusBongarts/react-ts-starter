import { useEffect, useState } from 'react';

type ILanguage = 'english' | 'german';

const Language = () => {
    const [language, setLanguage] = useState<ILanguage>('english');
    const updateLanguage = () => setLanguage(language === 'english' ? 'german' : 'english');

    useEffect(() => {
        // Executed once, when the component first mounts.
        console.log("Language mounted!");

        return () => {
            // When this element gets removes this will be executed. => like ngDestroy
            console.log("unsubscribe");
        }
    }, []);
    return <h1>Language: <button className="btn btn-purple" onClick={updateLanguage}>{language}</button></h1>
}

export default Language;