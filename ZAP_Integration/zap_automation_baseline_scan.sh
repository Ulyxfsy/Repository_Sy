#!/bin/bash
sed -i "s/PASSWORD/$PASSWORD/g" zap/testBrokenCrystals.yaml
sed -i "s/USERNAME/$USERNAME/g" zap/testBrokenCrystals.yaml
sed -i "s/ZAP_REPORT/$ZAP_REPORT/g" zap/testBrokenCrystals.yaml

# NOTE:
# We need this because the variable contains / in it.
# More info here https://unix.stackexchange.com/questions/255789/is-there-a-way-to-prevent-sed-from-interpreting-the-replacement-string/255869#255869
ESCAPED_CI_PROJECT_DIR=$(sed -e 's/[&\/]/\&/g; s/$/\/' -e '$s/\$//' <<<"$CI_PROJECT_DIR")
sed -i "s/CI_PROJECT_DIR/$ESCAPED_CI_PROJECT_DIR/g" zap/testBrokenCrystals.yaml
sed -i "s/ZAP_ALERT_REPORT/$ZAP_ALERT_REPORT/g" zap/testBrokenCrystals.yaml

/zap/zap.sh -cmd -autorun $CI_PROJECT_DIR/zap/testBrokenCrystals.yaml


returnCode=0
if grep -q "Instances" alert-report.md; then
  head -n 20 $ZAP_ALERT_REPORT.md
  echo "DAST RESULT: There are some vulnerabilities that ZAP has found (those visible here may not be the only ones). See the detailed report for more information."
  returnCode=1
fi

exit $returnCode