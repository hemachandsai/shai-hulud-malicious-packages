# 🪱📦 Shai-Hulud: Malicious NPM Packages Database
![Last Commit](https://img.shields.io/github/last-commit/hemachandsai/shai-hulud-malicious-packages)
![Update Frequency](https://img.shields.io/badge/updates-every%2030%20minutes-blue)
![Auto Update](https://github.com/hemachandsai/shai-hulud-malicious-packages/actions/workflows/update-malicious-db.yml/badge.svg)
![GitHub Stars](https://img.shields.io/github/stars/hemachandsai/shai-hulud-malicious-packages?style=flat)
![License](https://img.shields.io/github/license/hemachandsai/shai-hulud-malicious-packages)

<p align="center">
  <img src="assets/banner.png" width="100%" alt="Shai-Hulud Malicious Packages Banner" />
</p>

**Shai-Hulud** is an autonomous threat-intelligence engine that ingests confirmed **malicious NPM package advisories** from OSV and consolidates them into a continuously updated, machine-readable JSON database.  
It exists so automated scanners, CI pipelines, and supply-chain monitoring systems can rely on a **single, deterministic intelligence file** rather than parsing hundreds of OSV advisories individually.

---

## 📦 What This Repository Provides

* A **single consolidated JSON database** [`malicious_npm_packages.json`](https://github.com/hemachandsai/shai-hulud-malicious-packages/blob/main/malicious_npm_packages.json) containing all known malicious NPM packages and their corresponding versions, enriched with advisory metadata and automatically updated every 30 minutes.  
* This file serves as a compact “malicious package signature database” that can be fed directly into scanners and security tools.

---

## 🔥 Why This Project Exists

OSV and related feeds publish high-quality malicious-package advisories — but not in a format that is trivial for automation, scanners, or monitoring systems to consume.

This repository solves that by providing:

- A unified, version-aware JSON index of malicious packages  
- Deterministic and normalized structure  
- Frequent automated updates  

It provides the **simplest possible interface** for integrating malicious-package intelligence into automated tooling.

---

## 📊 Database Statistics

The consolidated database currently contains:
<strong>
- Total Malicious Packages Added: 9731
</strong>

This value is **auto-updated** by the CI workflow by parsing `malicious_npm_packages.json` on every refresh run.


### 🛑 Disclaimer
Some packages flagged by this tool may not belong to the Shai-Hulud worm specifically.
This is expected.

Because advisories are inconsistent, delayed, and fragmented, we err on the side of safety. Any package flagged here shows confirmed malicious behavior, even if it originates from a different supply-chain incident.

The scanner intentionally uses broader detection criteria to avoid missing newly-emerging variants or unreported malicious versions.

---

## 🔗 Using the Database

Simply consume:
`malicious_npm_packages.json`

We automatically split the large consolidated JSON file into multiple smaller ~2 MB chunks to ensure every part stays under GitHub’s indexing limit (≈5 MB per file). This makes all malicious package entries fully searchable through GitHub’s code search, while still preserving the complete dataset for programmatic consumption.

Use it as:

- A denylist  
- A malicious-package signature file  
- Input for automated scanners  
- A CI/CD supply-chain security control  

No internal code from this repository is required.

---

## 📜 Changelog.md

All detections of new malicious packages or new malicious versions are logged concisely which provides a simple chronological audit trail of malicious NPM activity as it evolves.

---

## 📥 Data Origin

All malicious-package intelligence in this repository is sourced from upstream feeds:

- **OpenSSF OSV – Malicious Packages**  
  https://github.com/ossf/malicious-packages

This repository **does not alter or reinterpret** advisories — it only **aggregates, normalizes, and consolidates** them for automation-friendly consumption.

---

## 🙏 Credits

### 🛡 Upstream Security Data Providers  
For maintaining the advisories that power this consolidated feed.

- **OpenSSF OSV – Malicious Packages**  
  https://github.com/ossf/malicious-packages

- **GitHub Advisory Database (GHSA)**  
  https://github.com/advisories  

- **Amazon Inspector**  


### 🤖 ChatGPT  
For helping bring this project to life rapidly — from concept to automation pipeline.

---

## 🤝 Contributions

Contributions are welcome, especially around:

- Additional threat-intelligence feeds  
