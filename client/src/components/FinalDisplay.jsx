import { useAppContext } from '../context/AppProvider';



export const FinalDisplay = ({isSubmitting}) => {
    const { token } = useAppContext();

    return (
        <section id='final-display'>
            {token ? (
                <>
                    <input 
                        type="submit" 
                        value="Save Calculation" 
                        disabled={isSubmitting} 
                    />
                </>
            ) : (
                <>
                
                </>
            )}
              
        </section>
    )
}