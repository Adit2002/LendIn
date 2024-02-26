from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Sample data (custom data for demonstration)
data = [
    {'income': 50000, 'employment': 'Full-time', 'debt_to_income_ratio': 0.4, 'non_payments': 0, 'late_payments': 2, 'credit_history_start_date': '2010-01-01', 'creditworthy': True},
    {'income': 30000, 'employment': 'Part-time', 'debt_to_income_ratio': 0.6, 'non_payments': 1, 'late_payments': 1, 'credit_history_start_date': '2012-05-10', 'creditworthy': False},
    {'income': 70000, 'employment': 'Full-time', 'debt_to_income_ratio': 0.3, 'non_payments': 0, 'late_payments': 0, 'credit_history_start_date': '2005-12-15', 'creditworthy': True},
    # Add more data as needed
]

# Convert categorical variables to numerical
for row in data:
    row['employment'] = 1 if row['employment'] == 'Full-time' else 0
    row['credit_history_start_date'] = datetime.strptime(row['credit_history_start_date'], '%Y-%m-%d')

# Calculate length of credit history in years
current_date = datetime.now()
for row in data:
    row['credit_history_length'] = (current_date - row['credit_history_start_date']).days / 365

# Extract features and target variable
X = [[row['income'], row['employment'], row['debt_to_income_ratio'], row['non_payments'], row['late_payments'], row['credit_history_length']] for row in data]
y = [row['creditworthy'] for row in data]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)

# Predict on the test set
y_pred = clf.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Example of scoring a new applicant
new_applicant = [60000, 1, 0.5, 0, 1, 5]  # Income: $60,000, Full-time employment, Debt-to-income ratio: 0.5, Non-payments: 0, Late payments: 1, Credit history length: 5 years
credit_score = clf.predict_proba([new_applicant])[0][1] * 1000  # Assuming the output is between 0 and 1
print("Credit Score for the new applicant:", credit_score)
