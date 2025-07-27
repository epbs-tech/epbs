// components/BlogPreview.tsx - Composant de prévisualisation
import React from 'react';

interface BlogPreviewProps {
  blog: {
    title: string;
    author: string;
    description?: string;
    sections: Array<{
      title: string;
      contents: Array<{
        type: 'TEXT' | 'NUMBERED_LIST' | 'BULLET_LIST' | 'TABLE';
        text?: string;
        listItems?: string[];
        tableData?: {
          headers: string[];
          rows: string[][];
        };
      }>;
    }>;
  };
  onClose: () => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog, onClose }) => {
  const renderContent = (content: any) => {
    switch (content.type) {
      case 'TEXT':
        return content.text ? (
          <p className="mb-4 text-gray-700 leading-relaxed">{content.text}</p>
        ) : null;

      case 'NUMBERED_LIST':
        return content.listItems && content.listItems.length > 0 ? (
          <ol className="mb-4 list-decimal list-inside space-y-2">
            {content.listItems.map((item: string, index: number) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ol>
        ) : null;

      case 'BULLET_LIST':
        return content.listItems && content.listItems.length > 0 ? (
          <ul className="mb-4 list-disc list-inside space-y-2">
            {content.listItems.map((item: string, index: number) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        ) : null;

      case 'TABLE':
        return content.tableData ? (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {content.tableData.headers.map((header: string, index: number) => (
                    <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.tableData.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Prévisualisation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title || 'Titre du blog'}</h1>
              <div className="flex items-center text-gray-600 space-x-4">
                <span>Par {blog.author || 'Auteur'}</span>
                <span>•</span>
                <time>{new Date().toLocaleDateString('fr-FR')}</time>
              </div>
              {blog.description && (
                <p className="mt-4 text-lg text-gray-600 italic">{blog.description}</p>
              )}
            </header>

            <div className="space-y-8">
              {blog.sections.map((section, sectionIndex) => (
                <section key={sectionIndex}>
                  {section.title && (
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                  )}
                  <div className="space-y-4">
                    {section.contents.map((content, contentIndex) => (
                      <div key={contentIndex}>
                        {renderContent(content)}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;