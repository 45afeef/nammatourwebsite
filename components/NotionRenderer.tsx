import React from "react";
import "../styles/medium-like.css";

function renderRichText(richText: any[]) {
    return richText.map((t, i) => {
        if (t.href) {
            return (
                <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">
                    {t.plain_text}
                </a>
            );
        }
        return <span key={i}>{t.plain_text}</span>;
    });
}

export default function NotionRenderer({ blocks }: { blocks: any[] }) {
    function renderBlocks(blocks: any[]) {
        const elements = [];
        let i = 0;
        while (i < blocks.length) {
            const block = blocks[i];
            // Group consecutive numbered_list_item
            if (block.type === "numbered_list_item") {
                const items = [];
                let j = i;
                while (j < blocks.length && blocks[j].type === "numbered_list_item") {
                    items.push(blocks[j]);
                    j++;
                }
                elements.push(
                    <ol key={block.id + "-ol"} className="medium-blog-ol">
                        {items.map((item, idx) => (
                            <li key={item.id}>
                                {/* <span style={{ fontWeight: 'bold', marginRight: 6 }}>{idx + 1}.</span> */}
                                {renderRichText(item.numbered_list_item.rich_text)}
                            </li>
                        ))}
                    </ol>
                );
                i = j;
                continue;
            }
            // Handle consecutive bulleted_list_item
            if (block.type === "bulleted_list_item") {
                const items = [];
                let j = i;
                while (j < blocks.length && blocks[j].type === "bulleted_list_item") {
                    items.push(blocks[j]);
                    j++;
                }
                elements.push(
                    <ul key={block.id + "-ul"} className="medium-blog-ul">
                        {items.map((item) => (
                            <li key={item.id}>{renderRichText(item.bulleted_list_item.rich_text)}</li>
                        ))}
                    </ul>
                );
                i = j;
                continue;
            }
            try {
                switch (block.type) {
                    case "paragraph":
                        elements.push(
                            <p key={block.id} className="medium-blog-paragraph">{renderRichText(block.paragraph.rich_text)}</p>
                        );
                        break;
                    case "heading_1":
                        elements.push(
                            <h1 key={block.id} className="medium-blog-h1">{renderRichText(block.heading_1.rich_text)}</h1>
                        );
                        break;

                    case "heading_2":
                        elements.push(
                            <h2 key={block.id} className="medium-blog-h2">{renderRichText(block.heading_2.rich_text)}</h2>
                        );
                        break;
                    case "heading_3":
                        elements.push(
                            <h3 key={block.id} className="medium-blog-h3">{renderRichText(block.heading_3.rich_text)}</h3>
                        );
                        break;
                    case "image": {
                        const img = block.image;
                        const src = img.type === "external" ? img.external.url : img.file.url;
                        elements.push(<img key={block.id} src={src} alt="" className="blog-cover medium-blog-img" />);
                        break;
                    }
                    case "quote":
                        elements.push(
                            <blockquote key={block.id} className="medium-blog-blockquote">{renderRichText(block.quote.rich_text)}</blockquote>
                        );
                        break;
                    case "code":
                        elements.push(
                            <pre key={block.id} className="medium-blog-pre">
                                <code>{block.code.rich_text.map((t: any) => t.plain_text).join("")}</code>
                            </pre>
                        );
                        break;
                    case "divider":
                        elements.push(<hr key={block.id} className="medium-blog-hr" />);
                        break;
                    case "callout":
                        elements.push(
                            <div key={block.id} className="medium-blog-callout" style={{ background: '#f9f9f9', borderLeft: '4px solid #ffd700', padding: '1em', margin: '1em 0' }}>
                                {block.callout.icon?.emoji && <span>{block.callout.icon.emoji} </span>}
                                {renderRichText(block.callout.rich_text)}
                            </div>
                        );
                        break;
                    case "to_do":
                        elements.push(
                            <div key={block.id} className="medium-blog-todo" style={{ display: 'flex', alignItems: 'center', margin: '0.5em 0' }}>
                                <input type="checkbox" checked={block.to_do.checked} readOnly style={{ marginRight: 8 }} />
                                {renderRichText(block.to_do.rich_text)}
                            </div>
                        );
                        break;
                    case "bookmark":
                        elements.push(
                            <div key={block.id} className="medium-blog-bookmark" style={{ margin: '1em 0' }}>
                                <a href={block.bookmark.url} target="_blank" rel="noopener noreferrer">{block.bookmark.url}</a>
                            </div>
                        );
                        break;
                    case "embed":
                        elements.push(
                            <iframe key={block.id} className="medium-blog-embed" src={block.embed.url} style={{ width: '100%', minHeight: 300, border: 0 }} allowFullScreen />
                        );
                        break;
                    case "file": {
                        const file = block.file;
                        const url = file.type === "external" ? file.external.url : file.file.url;
                        elements.push(
                            <div key={block.id} className="medium-blog-file" style={{ margin: '1em 0' }}>
                                <a href={url} target="_blank" rel="noopener noreferrer">{file.name || url}</a>
                            </div>
                        );
                        break;
                    }
                    case "pdf": {
                        const pdf = block.pdf;
                        const url = pdf.type === "external" ? pdf.external.url : pdf.file.url;
                        elements.push(
                            <div key={block.id} className="medium-blog-pdf" style={{ margin: '1em 0' }}>
                                <a href={url} target="_blank" rel="noopener noreferrer">PDF</a>
                            </div>
                        );
                        break;
                    }
                    case "video": {
                        const video = block.video;
                        const url = video.type === "external" ? video.external.url : video.file.url;
                        elements.push(
                            <video key={block.id} className="medium-blog-video" src={url} controls style={{ width: '100%', margin: '1em 0' }} />
                        );
                        break;
                    }
                    case "audio": {
                        const audio = block.audio;
                        const url = audio.type === "external" ? audio.external.url : audio.file.url;
                        elements.push(
                            <audio key={block.id} className="medium-blog-audio" src={url} controls style={{ width: '100%', margin: '1em 0' }} />
                        );
                        break;
                    }
                    case "table": {
                        // Render Notion table block as HTML table
                        const table = block.table;
                        const rows = block.rows || [];
                        const tableWidth = table?.table_width || 0;
                        const hasColumnHeader = table?.has_column_header;
                        const hasRowHeader = table?.has_row_header;

                        elements.push(
                            <div key={block.id} className="medium-blog-table" style={{ overflowX: 'auto', margin: '2em 0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                                    <tbody>
                                        {rows.map((row: any, rowIdx: number) => {
                                            const cells = row.table_row?.cells || [];
                                            return (
                                                <tr key={row.id}>
                                                    {cells.map((cell: any, colIdx: number) => {
                                                        // Determine if this cell is a header cell
                                                        const isHeader = (hasColumnHeader && rowIdx === 0) || (hasRowHeader && colIdx === 0);
                                                        const Tag = isHeader ? 'th' : 'td';
                                                        return (
                                                            <Tag
                                                                key={colIdx}
                                                                style={{
                                                                    border: '1px solid #eee',
                                                                    padding: '0.7em 1em',
                                                                    background: isHeader ? '#fffbe6' : '#fff',
                                                                    fontWeight: isHeader ? 700 : 400,
                                                                    textAlign: 'left',
                                                                }}
                                                            >
                                                                {renderRichText(cell)}
                                                            </Tag>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        );
                        break;
                    }
                    case "table_row":
                        // Table rows are handled inside table block rendering
                        break;
                    case "breadcrumb":
                        elements.push(<div key={block.id} className="medium-blog-breadcrumb" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Breadcrumb block not rendered:</b> This block type is not fully supported yet.
                        </div>);
                        break;
                    case "child_database":
                        elements.push(<div key={block.id} className="medium-blog-child-database" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Child database block not rendered:</b> This block type is not fully supported yet.
                        </div>);
                        break;
                    case "child_page":
                        elements.push(<div key={block.id} className="medium-blog-child-page" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Child page block not rendered:</b> This block type is not fully supported yet.
                        </div>);
                        break;
                    case "column_list":
                        elements.push(
                            <div key={block.id} className="medium-blog-column-list">
                                {(block.children || []).map((col: any) => (
                                    <div key={col.id} className="medium-blog-column">{renderBlocks(col.children || [])}</div>
                                ))}
                            </div>
                        );
                        break;
                    case "column":
                        elements.push(<div key={block.id} className="medium-blog-column">{renderBlocks(block.children || [])}</div>);
                        break;
                    case "link_to_page":
                        elements.push(<div key={block.id} className="medium-blog-link-to-page" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Link to page block not rendered:</b> This block type is not fully supported yet.
                        </div>);
                        break;
                    case "template":
                        elements.push(<div key={block.id} className="medium-blog-template" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Template block not rendered:</b> This block type is not fully supported yet.
                        </div>);
                        break;
                    case "synced_block":
                        elements.push(<div key={block.id} className="medium-blog-synced-block">{renderBlocks(block.synced_block.children || [])}</div>);
                        break;
                    case "unsupported":
                        elements.push(<div key={block.id} className="medium-blog-unsupported" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Unsupported block type:</b> {block.type}
                        </div>);
                        break;
                    default:
                        elements.push(<div key={block.id} className="medium-blog-unknown" style={{ background: '#fffbe6', color: '#b71c1c', border: '2px dashed #ffd700', padding: '0.5em', margin: '0.5em 0' }}>
                            ⚠️ <b>Unknown block type:</b> {block.type}
                        </div>);
                        break;
                }
            } catch (err: any) {
                elements.push(
                    <div key={block.id} style={{ color: 'red', background: '#fff0f0', padding: 8, margin: 8 }}>
                        Error rendering block <b>{block.id}</b> of type <b>{block.type}</b> at index <b>{i}</b>: {err.message}
                    </div>
                );
            }
            i++;
        }
        return elements;
    }
    return (
        <div className="medium-blog">
            {renderBlocks(blocks)}
        </div>
    );
}
