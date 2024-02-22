import numpy as np
import pickle
import sys

# Load the XGBoost model
filename = 'C:\\Users\\HP\\Documents\\GitHub\\LendIn\\server\\gen_model\\xgboost_model.pkl'
with open(filename, 'rb') as f:
    model = pickle.load(f)

# Retrieve command line arguments
LOAN = float(sys.argv[2])
MORTDUE = float(sys.argv[3])
VALUE = float(sys.argv[4])
YOJ = float(sys.argv[5])
DEROG = float(sys.argv[6])
# DEROG = 
DELINQ = float(sys.argv[7])
CLAGE = float(sys.argv[8])
NINQ = float(sys.argv[9])
CLNO = float(sys.argv[10])
DEBTINC = float(sys.argv[11])
# DEBTINC=7

# Create an input array
input_array = np.array([[LOAN, MORTDUE, VALUE, YOJ, DEROG, DELINQ, CLAGE, NINQ, CLNO, DEBTINC]])

# Make a prediction
prediction = model.predict(input_array)

# Print the predicted output
print(prediction)
