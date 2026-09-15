import re
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

src, dst = sys.argv[1], sys.argv[2]

with open(src, "r", encoding="utf-8") as f:
    raw_lines = f.read().splitlines()

styles = getSampleStyleSheet()
BRAND = colors.HexColor("#D9630D")

title_style = ParagraphStyle("TitleCustom", parent=styles["Title"], fontSize=18,
                              textColor=BRAND, spaceAfter=4, alignment=TA_LEFT)
meta_style = ParagraphStyle("Meta", parent=styles["Normal"], fontSize=10,
                             textColor=colors.HexColor("#444444"), spaceAfter=2)
h2_style = ParagraphStyle("H2Custom", parent=styles["Heading2"], fontSize=13,
                           textColor=BRAND, spaceBefore=16, spaceAfter=6)
body_style = ParagraphStyle("BodyCustom", parent=styles["Normal"], fontSize=10.5,
                             leading=15, spaceAfter=8)
bullet_style = ParagraphStyle("BulletCustom", parent=styles["Normal"], fontSize=10.5,
                               leading=15, leftIndent=14, spaceAfter=4)
checklist_style = ParagraphStyle("ChecklistCustom", parent=styles["Normal"], fontSize=10.5,
                                  leading=15, leftIndent=14, spaceAfter=6)
italic_style = ParagraphStyle("ItalicCustom", parent=styles["Normal"], fontSize=9.5,
                               textColor=colors.HexColor("#555555"), spaceBefore=10)


def inline(text):
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"`([^`]+)`", r'<font face="Courier">\1</font>', text)
    return text


# 1) Split into blocks separated by blank lines.
blocks, current = [], []
for line in raw_lines:
    if line.strip() == "":
        if current:
            blocks.append(current)
            current = []
    else:
        current.append(line)
if current:
    blocks.append(current)

story = []

for block in blocks:
    first = block[0].strip()

    if first == "---" and len(block) == 1:
        story.append(Spacer(1, 4))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#CCCCCC")))
        story.append(Spacer(1, 10))
        continue

    if first.startswith("# "):
        story.append(Paragraph(inline(first[2:]), title_style))
        continue

    if first.startswith("## "):
        story.append(Paragraph(inline(first[3:].strip()), h2_style))
        continue

    if re.match(r"^- \[ \] ", first) or first.startswith("- "):
        # List block: may contain several items; continuation lines (no leading
        # "- ") belong to the previous item and get joined with a space.
        items = []
        for line in block:
            s = line.strip()
            m = re.match(r"^- \[ \] (.+)$", s)
            if m:
                items.append(("check", m.group(1)))
            elif s.startswith("- "):
                items.append(("bullet", s[2:]))
            else:
                kind, text = items[-1]
                items[-1] = (kind, text + " " + s)
        for kind, text in items:
            if kind == "check":
                story.append(Paragraph("[&nbsp;&nbsp;]&nbsp;&nbsp;" + inline(text), checklist_style))
            else:
                story.append(Paragraph("&bull;&nbsp; " + inline(text), bullet_style))
        continue

    # Plain paragraph: join wrapped lines with a single space.
    joined = " ".join(s.strip() for s in block)

    if joined.startswith("*") and joined.endswith("*") and not joined.startswith("**"):
        story.append(Paragraph(inline(joined), italic_style))
        continue

    if re.match(r"^\*\*[^*]+:\*\*", joined):
        story.append(Paragraph(inline(joined), meta_style))
        continue

    story.append(Paragraph(inline(joined), body_style))

doc = SimpleDocTemplate(
    dst, pagesize=letter,
    topMargin=2.2 * cm, bottomMargin=2 * cm, leftMargin=2.2 * cm, rightMargin=2.2 * cm,
    title="SIIS2 - Informacion pendiente para la pagina web",
)
doc.build(story)
print("OK ->", dst)
