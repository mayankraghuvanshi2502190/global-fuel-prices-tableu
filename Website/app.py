import os
from flask import Flask, render_template

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Tableau Public URLs (no query string needed for <tableau-viz>)
# Override with environment variables if you prefer:
#   export DASHBOARD_URL="https://public.tableau.com/views/..."
#   export STORY_URL="https://public.tableau.com/views/..."
# ---------------------------------------------------------------------------
app.config["DASHBOARD_URL"] = os.environ.get(
    "DASHBOARD_URL",
    "https://public.tableau.com/views/GlobalFuelPricesandTaxationTrends/Sheet9-10?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
)
# TODO: replace with your published Tableau Story URL
app.config["STORY_URL"] = os.environ.get(
    "STORY_URL",
    "https://public.tableau.com/views/GlobalFuelPricesandTaxationTrends/Story1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
)


@app.route("/")
def index():
    return render_template(
        "index.html",
        dashboard_url=app.config["DASHBOARD_URL"],
        story_url=app.config["STORY_URL"],
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
