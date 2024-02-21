import numpy as np
import pickle

# Load the XGBoost model
filename = 'C:\\Users\\HP\\Documents\\GitHub\\LendIn\\server\\gen_model\\xgboost_model.pkl'
with open(filename, 'rb') as f:
    model = pickle.load(f)

# Define a function to calculate the installment
def calculate_installment(loan_amount, term_months, annual_interest_rate):
    monthly_interest_rate = annual_interest_rate / 12 / 100
    num_payments = term_months
    monthly_payment = (loan_amount * monthly_interest_rate * (1 + monthly_interest_rate) ** num_payments) / \
                      ((1 + monthly_interest_rate) ** num_payments - 1)
    return monthly_payment

# Define the input parameters
loan_amt = 4000000000
term = 2
int_rate = 11.5
monthly_intrest=calculate_installment(loan_amt,term,int_rate)
emp_length = 0
home_ownership = 0
annual_inc = 0
verification_status = 0
pub_rec = 2

# Create an array of input parameters
input_array = np.array([[loan_amt, term, int_rate,monthly_intrest, emp_length, home_ownership, annual_inc, verification_status, pub_rec]])

# Make a prediction
prediction = model.predict(input_array)

# Print the predicted installment
print("Predicted Output:", prediction)
