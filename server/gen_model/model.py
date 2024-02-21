import numpy as np
import pickle

# Load the XGBoost model
filename = 'C:\\Users\\HP\\Documents\\GitHub\\LendIn\\server\\gen_model\\xgboost_model.pkl'
with open(filename, 'rb') as f:
    model = pickle.load(f)

LOAN = 25000
MORTDUE = 0
VALUE = 0
YOJ = 0
DEROG = 3
DELINQ = 2
CLAGE = 14
NINQ = 0
CLNO = 10
DEBTINC = 10

# Create an input array
input_array = np.array([[LOAN, MORTDUE, VALUE, YOJ, DEROG, DELINQ, CLAGE, NINQ, CLNO, DEBTINC]])

# Make a prediction
prediction = model.predict(input_array)

# Print the predicted output
print("Predicted Output:", prediction)
