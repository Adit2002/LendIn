# LendIn
 A p2p Lending App built as a part of College Project.
# Frontend :
Frontend for the webapp is built using React.js.  
**1.** 
Used `react-router-dom` for implementing different routes for frontend.
**2.** 
Used Google-O-Auth + JWT Mechanism for Login/SignUp.  
**3.** MultiRole Login added where each user can login as a lender or borrower or both.  
**4.** UI is enhanced using `material-UI` and used `canva` for background textures.  
**5.** Used `Chart.js` for implementing charts and graphs defining user behaviour.  
**6.** `Metamask` is integrated in frontend for real time money transfer.   
**Collaborator:** Aryan Shukla helped in frontend building.  

# Backend: 
**1.** Backend is running on express serves.   
**2.** Contains `Api` facilitating in Authorizing and validating the user using a middleware which checks the inbuilt JWT with JWT that Google-O-Auth provides.    
**3.** ML Model is running using `childprocess` in javascript.  
**4.** `MongoDB` is used for storing user and machine data.   
**5.** Environment Variables are managed using `dotenv` for secure configuration management.    

# ML Model
**1.** Dataset of lendingclub taken from `kaggle`  
**2.** Used the dataset to train a model that predicts default percentage range and filters them.  
**3.** Various filtering methods were used.  
**4.** Ensemble of XgBoost and ANN used for classification.  
**5** A `pickel` file is built that is used by the backend for realtime classification.  



