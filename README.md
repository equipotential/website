# Equipotential Lab website

The public website for Equipotential Lab LLC and TASC, its scientific desktop software for spacecraft charging and electrostatic analysis.

## Preview locally

Run from this folder:

```sh
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173>. No package installation or build is needed.

## Edit

- `dist/index.html`: public content and page structure.
- `dist/styles.css`: responsive layout and visual styling.
- `dist/app.js`: illustrative potential contours and application screenshot selector.
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

The AI example at `#ai-example` uses saved renders from TASC's `output/self-interpreted-cad` example dated 9 September 2026. Its saved mesh statistics are 23 components, 3,077 nodes, and 3,720 panels. The image-derived CAD artifact records provisional charging assignments and `solverInputApproved: false`; this example does not show a charging simulation. The displayed request is illustrative wording, not a recovered conversation transcript. Only the two rendered images are published, not the source reference image or model files.
