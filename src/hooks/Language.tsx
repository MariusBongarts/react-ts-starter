import React, { useState } from 'react';

type ILanguage = 'english' | 'german';

function Language() {
    const [language, setLanguage] = useState<ILanguage>('english');
    const updateLanguage = () => setLanguage(language === 'english' ? 'german' : 'english');
    return <h1>Language: <button className="btn btn-purple" onClick={updateLanguage}>{language}</button></h1>
}

export default React.memo(Language);