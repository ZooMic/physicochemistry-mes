const calculateEnthalpy = (data, dT = 1) => {
        
        /**
         * We can assume that our data are correct
         * there should be validation on the beggining of the import
         * so that if something is wrong, user could notice this
         * exacly when he is doing it.
         */
        
        const result = [];        
        
        data.forEach((row, rowId) => {
            const [ T, Cp ] = row; // Temperature and specific heat

            if (rowId === 0) {
                result.push({
                    temperature: T,
                    specificHeat: Cp,
                    enthalpy: T * Cp,
                });
            } else {
                const [ pT, pCp ] = data[rowId - 1]; // previous Temperature and specific heat
                for (let i = pT; i <= T; i += dT) {
                    const iCp = pCp + (i - pT) / (T - pT) * (Cp - pCp); // Interpolated specific heat
                    const { enthalpy : pH } = result[result.length - 1]; // Previous/Last Enthalpy
                    const iH = pH + iCp * dT;

                    result.push({
                        temperature: i,
                        specificHeat: iCp,
                        enthalpy: iH,
                    });
                }
            }
        });
}

export default calculateEnthalpy;