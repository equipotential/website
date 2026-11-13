# Equipotential Lab website

The public website for Equipotential Lab LLC. The homepage introduces AI tools that accelerate engineering workflows, with Design & Modeling and Space Domain as focus areas. Home, Design & Modeling, Space Domain, and The lab are active. Talk to us uses Web3Forms for submissions.

## Preview locally

Run from this folder:

```sh
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173>. No package installation or build is needed.

## Edit

- `dist/contact.html`, `dist/contact.css`, and `dist/contact.js`: Talk to us page with engineering, partnership, and investor inquiry paths and contextual prompts. Submissions use Web3Forms with a public access key, honeypot, and hCaptcha. Enable hCaptcha in the Web3Forms form dashboard to enforce it on the server. The form displays success only after API confirmation, preserves entries on failure, and prevents concurrent submissions. No account credentials are included in the website.
- `dist/lab.html` and `dist/lab.css`: Lab page covering AI-accelerated CAD and multidisciplinary analysis. The timeline comparison is illustrative potential, not a measured benchmark.
- `dist/index.html`: public content and page structure.
- `dist/home.css`: shared branding, homepage layout, workflow diagram styling, and responsive design.
- `dist/design-modeling.html` and `dist/design-modeling.css`: Design & Modeling page with the supplied TASC gearbox CAD screenshot.
- `dist/space-domain.html` and `dist/space-domain.css`: Space Domain page with the two November 13 TASC examples: AI-assisted lander modeling and 3D charging results.
- `dist/assets/tasc-lander-model-2026-11-13.png` and `dist/assets/tasc-charging-results-2026-11-13.png`: November 13 screenshots supplied by the user, replacing the earlier mesh and lunar chat examples. The lander image shows the model and AI conversation; the results image shows surface potential at 1,000 seconds with a potential summary and the TASC AI menu open.
- `dist/assets/tasc-gearbox-cad.png`: actual TASC development screenshot supplied on 13 November 2026; it shows a CAD example, not a charging analysis result.
- `dist/styles.css`: retained styles for the earlier TASC-focused page.
- `dist/app.js`: retained earlier TASC interactions; not loaded by the current homepage.
- `dist/assets/`: application screenshots selected from the TASC workspace.

## Company logo

The contour monogram combines nested open curves with a shared horizontal line to suggest an **e**, equal potential, and a common reference. The wordmark uses a bold company name with a lighter `lab`.

- `dist/assets/brand/logo.svg` and `logo.png`: transparent logo for light backgrounds.
- `dist/assets/brand/logo-dark.svg` and `logo-dark.png`: transparent light logo for dark backgrounds.
- `dist/assets/brand/mark.svg` and `mark.png`: standalone blue monogram.
- `dist/assets/brand/favicon.svg`: simplified mark for browser tabs.

Primary blue: `#2c43ed`. Ink: `#20251f`. Light background: `#f5f6f2`. Light blue on dark backgrounds: `#b4c4ff`. Keep clear space around the mark of at least one quarter of its width. SVG wordmarks use Arial/Helvetica; the PNG exports preserve the rendered appearance without requiring fonts.

The contour diagram illustrates two ideal point charges in normalized units. It is not TASC solver output or a spacecraft simulation. The screenshots show an actual development interface; features and appearance may change.

## GitHub Pages

Repository: [equipotential/website](https://github.com/equipotential/website).
The default Pages address, once hosting is enabled, is <https://equipotential.github.io/website/>.

1. Store this repository on GitHub with `main` as its default branch.
2. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Push to `main` or run **Deploy website to GitHub Pages** from the Actions tab.
4. The successful deployment provides the website URL under Settings → Pages.

Only `dist/` is published. Source business documents, proposals, registration records, and TASC source code are not part of this repository. All asset URLs are relative, so the website works under a GitHub project URL and a custom domain.

## Point equipotentiallab.com to the website

GitHub stores and hosts the site; GoDaddy can continue to manage the domain.

1. Verify ownership of `equipotentiallab.com` in the GitHub account's Pages settings using the TXT record GitHub provides.
2. In this repository's **Settings → Pages**, set **Custom domain** to `equipotentiallab.com`.
3. At the domain's DNS provider, set these records. Replace existing conflicting web-hosting A/AAAA/CNAME or forwarding records for `@` and `www`; retain email records such as MX, SPF, DKIM, and DMARC.

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | equipotential.github.io |

4. After GitHub's DNS check and certificate provisioning finish, enable **Enforce HTTPS** in Pages settings. DNS propagation can take up to 24 hours.

The custom domain is configured in GitHub settings. A `CNAME` file is not needed for this Actions workflow. Do not change the domain's nameservers just to use GitHub Pages.

Official references: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), and [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

## Content basis

Product descriptions were checked against the local TASC overview and technical documentation on 5 October 2026. The site describes active development and supported capabilities without claiming NASA adoption, mission qualification, or independently established performance superiority. No software download, public TASC source release, or contact address is implied.

The AI example at `#ai-example` uses saved renders from TASC's `output/self-interpreted-cad` example dated 9 September 2026. Its saved mesh statistics are 23 components, 3,077 nodes, and 3,720 panels. The image-derived CAD artifact records provisional charging assignments and `solverInputApproved: false`; this example does not show a charging simulation. The displayed request is illustrative wording, not a recovered conversation transcript. Only rendered images are published, not the source reference image or model files.

`dist/assets/tasc-ai-chat.png` was captured on 5 October 2026 from the actual TASC desktop application's AI Object Builder controls using the existing local application binaries. It shows the saved lander mesh, TASC's default greeting, and an unsent example prompt. No AI request or solver run was performed for the screenshot; it is not a transcript of the lander's generation.

The product positioning describes TASC as designed for rapid spacecraft charging analysis and to save months of engineering work. This states the product goal rather than a measured time-saving benchmark.
