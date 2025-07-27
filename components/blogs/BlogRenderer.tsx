// components/BlogRenderer.tsx - Composant pour afficher un blog
import React from 'react';

interface BlogRendererProps {
  blog: {
    title: string;
    author: string;
    date: string;
    description?: string;
    sections: Array<{
      title: string;
      contents: Array<{
        type: 'TEXT' | 'NUMBERED_LIST' | 'BULLET_LIST' | 'TABLE';
        text?: string;
        listItems?: string[];
        listType?: 'NUMBERED' | 'BULLET';
        tableData?: {
          headers: string[];
          rows: string[][];
        };
      }>;
    }>;
  };
}

const BlogRenderer: React.FC<BlogRendererProps> = ({ blog }) => {
  const renderContent = (content: any) => {
    switch (content.type) {
      case 'TEXT':
        return <p className="mb-4 text-gray-700 leading-relaxed">{content.text}</p>;

      case 'NUMBERED_LIST':
        return (
          <ol className="mb-4 list-decimal list-inside space-y-2">
            {content.listItems?.map((item: string, index: number) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ol>
        );

      case 'BULLET_LIST':
        return (
          <ul className="mb-4 list-disc list-inside space-y-2">
            {content.listItems?.map((item: string, index: number) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );

      case 'TABLE':
        return (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {content.tableData?.headers.map((header: string, index: number) => (
                    <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.tableData?.rows.map((row: string[], rowIndex: number) => (
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
        );

      default:
        return null;
    }
  };

  return (
    <article className="max-w-4xl mx-auto p-6 bg-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-600 space-x-4">
          <span>Par {blog.author}</span>
          <span>•</span>
          <time>{new Date(blog.date).toLocaleDateString('fr-FR')}</time>
        </div>
        {blog.description && (
          <p className="mt-4 text-lg text-gray-600 italic">{blog.description}</p>
        )}
      </header>

      <div className="space-y-8">
        {blog.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
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
  );
};

export default BlogRenderer;