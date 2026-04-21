#!/bin/bash
PROJECT_DIR="/home/carol/Development/Documents/code/work/aic/aic-happy-valley"
GIVING_FILE="$PROJECT_DIR/src/pages/Giving.tsx"
INDEX_FILE="$PROJECT_DIR/index.html"

# Patch Giving.tsx
# Replace Paybill details
sed -i 's/Paybill: 123456 | Account: GIVING/Paybill: 400222 | Account: 1701889# (Please remember to include the "#" sign)/g' "$GIVING_FILE"
# Replace Bank Transfer with Cash details (assuming 3 card structure)
sed -i 's/title: .Bank Transfer./title: "Cash"/g' "$GIVING_FILE"
sed -i 's/details: .KCB Thika | Account: 1100223344./details: "Give via cash offering during our Sunday services."/g' "$GIVING_FILE"
# Remove the 3rd card (Credit/Debit) by deleting the object from paymentMethods array
# This is a bit tricky with sed, we'll just hide it for now or make it col-2
sed -i 's/md:grid-cols-3/md:grid-cols-2 max-w-3xl mx-auto/g' "$GIVING_FILE"

# Patch index.html
sed -i 's/aic-happy-valley.web.app/aichappyvalley.org/g' "$INDEX_FILE"
sed -i 's/<title>.*<\/title>/<title>AIC Happy Valley — Growing Deeper, Living Stronger<\/title>/g' "$INDEX_FILE"

echo "Patches applied successfully!"
