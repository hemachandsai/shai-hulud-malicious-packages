# 🪱📦 Shai-Hulud: Malicious NPM Package DB

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

## 📊 Database Statistics

The consolidated database currently contains:

- **🧩 Total Malicious Packages Added:** `72938`

This value is **auto-updated** by the CI workflow by parsing  
`malicious_npm_packages.json` on every refresh run.

---

## 🔥 Why This Project Exists

OSV and related feeds publish high-quality malicious-package advisories — but not in a format that is trivial for automation, scanners, or monitoring systems to consume.

This repository solves that by providing:

- A unified, version-aware JSON index of malicious packages  
- Deterministic and normalized structure  
- Frequent automated updates  

It provides the **simplest possible interface** for integrating malicious-package intelligence into automated tooling.

---

## 🔗 Using the Database

Simply consume:
`malicious_npm_packages.json`


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

## ⚠️ Disclaimer

This repository does **not independently verify or audit** malicious package reports.  
Use it as an intelligence feed alongside broader SCA & security tooling.

---

## 🤝 Contributions

Contributions are welcome, especially around:

- Additional threat-intelligence feeds  
