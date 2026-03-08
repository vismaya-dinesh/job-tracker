from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(120))
    role = db.Column(db.String(120))
    status = db.Column(db.String(50))
    link = db.Column(db.String(255))
    notes = db.Column(db.Text)


@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()

    return jsonify([
        {
            "id": job.id,
            "company": job.company,
            "role": job.role,
            "status": job.status,
            "link": job.link,
            "notes": job.notes
        }
        for job in jobs
    ])


@app.route("/jobs", methods=["POST"])
def add_job():
    data = request.json

    job = Job(
        company=data["company"],
        role=data["role"],
        status=data["status"],
        link=data.get("link"),
        notes=data.get("notes")
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job added"})


@app.route("/jobs/<int:id>", methods=["PUT"])
def update_job(id):

    job = Job.query.get(id)
    data = request.json

    job.company = data["company"]
    job.role = data["role"]
    job.status = data["status"]
    job.link = data.get("link")
    job.notes = data.get("notes")

    db.session.commit()

    return jsonify({"message": "Job updated"})


@app.route("/jobs/<int:id>", methods=["DELETE"])
def delete_job(id):

    job = Job.query.get(id)

    db.session.delete(job)
    db.session.commit()

    return jsonify({"message": "Job deleted"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)