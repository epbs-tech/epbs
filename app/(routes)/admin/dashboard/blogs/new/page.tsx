// BlogCreator.tsx - Version avec ImageUpload
"use client"
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Type, List, Hash, Table, Eye, Save, Send } from 'lucide-react';
import BlogPreview from '@/components/blogs/BlogPreview';
import ImageUpload from '@/components/uploader/images-upload';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Types
interface BlogContent {
  id: number;
  type: 'TEXT' | 'NUMBERED_LIST' | 'BULLET_LIST' | 'TABLE';
  order?: number;
  text?: string;
  listItems?: string[];
  listType?: 'NUMBERED' | 'BULLET';
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

interface BlogSection {
  id: number;
  title: string;
  order?: number;
  contents: BlogContent[];
}

interface BlogData {
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
  published?: boolean;
  sections: BlogSection[];
}

const BlogCreator: React.FC = () => {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogData>({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
    sections: []
  });

  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addSection = (): void => {
    const newSection: BlogSection = {
      id: Date.now(),
      title: '',
      contents: []
    };
    setBlog(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: number, field: keyof BlogSection, value: string): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const deleteSection = (sectionId: number): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const addContent = (sectionId: number, type: BlogContent['type']): void => {
    const newContent: BlogContent = {
      id: Date.now(),
      type,
      text: type === 'TEXT' ? '' : undefined,
      listItems: ['NUMBERED_LIST', 'BULLET_LIST'].includes(type) ? [] : undefined,
      listType: type.includes('LIST') ? (type === 'NUMBERED_LIST' ? 'NUMBERED' : 'BULLET') : undefined,
      tableData: type === 'TABLE' ? { headers: [''], rows: [['']] } : undefined
    };

    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, contents: [...section.contents, newContent] }
          : section
      )
    }));
  };

  const updateContent = (sectionId: number, contentId: number, field: keyof BlogContent, value: any): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contents: section.contents.map(content =>
                content.id === contentId ? { ...content, [field]: value } : content
              )
            }
          : section
      )
    }));
  };

  const deleteContent = (sectionId: number, contentId: number): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, contents: section.contents.filter(content => content.id !== contentId) }
          : section
      )
    }));
  };

  const handleTableUpdate = (
    sectionId: number,
    contentId: number,
    type: 'headers' | 'rows',
    rowIndex: number | null,
    colIndex: number,
    value: string
  ): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contents: section.contents.map(content =>
                content.id === contentId && content.tableData
                  ? {
                      ...content,
                      tableData: {
                        ...content.tableData,
                        [type]: type === 'headers'
                          ? content.tableData.headers.map((header, i) => i === colIndex ? value : header)
                          : content.tableData.rows.map((row, i) =>
                              i === rowIndex ? row.map((cell, j) => j === colIndex ? value : cell) : row
                            )
                      }
                    }
                  : content
              )
            }
          : section
      )
    }));
  };

  const addTableRow = (sectionId: number, contentId: number): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contents: section.contents.map(content =>
                content.id === contentId && content.tableData
                  ? {
                      ...content,
                      tableData: {
                        ...content.tableData,
                        rows: [...content.tableData.rows, new Array(content.tableData.headers.length).fill('')]
                      }
                    }
                  : content
              )
            }
          : section
      )
    }));
  };

  const addTableColumn = (sectionId: number, contentId: number): void => {
    setBlog(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contents: section.contents.map(content =>
                content.id === contentId && content.tableData
                  ? {
                      ...content,
                      tableData: {
                        headers: [...content.tableData.headers, ''],
                        rows: content.tableData.rows.map(row => [...row, ''])
                      }
                    }
                  : content
              )
            }
          : section
      )
    }));
  };

  const handleImageUpload = (url: string): void => {
    setBlog(prev => ({ ...prev, imageUrl: url }));
  };

  const handleImageRemove = (): void => {
    setBlog(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (published: boolean = false): Promise<void> => {
    setIsLoading(true);
    try {
      const blogData: BlogData = {
        ...blog,
        published,
        sections: blog.sections.map((section, index) => ({
          ...section,
          order: index,
          contents: section.contents.map((content, contentIndex) => ({
            ...content,
            order: contentIndex
          }))
        }))
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
      }

      const result = await response.json();
      toast.success(published ? 'Blog publié avec succès!' : 'Blog sauvegardé comme brouillon!');

      // Redirection vers la liste des blogs
      router.push('/admin/dashboard/blogs');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(`Erreur lors de la sauvegarde du blog: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  interface ContentRendererProps {
    content: BlogContent;
    sectionId: number;
  }

  const ContentRenderer: React.FC<ContentRendererProps> = ({ content, sectionId }) => {
    switch (content.type) {
      case 'TEXT':
        return (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
            rows={4}
            placeholder="Entrez votre texte..."
            value={content.text || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateContent(sectionId, content.id, 'text', e.target.value)
            }
          />
        );

      case 'NUMBERED_LIST':
      case 'BULLET_LIST':
        return (
          <div className="space-y-2">
            {content.listItems?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-500 min-w-6">
                  {content.type === 'NUMBERED_LIST' ? `${index + 1}.` : '•'}
                </span>
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={item}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newItems = [...(content.listItems || [])];
                    newItems[index] = e.target.value;
                    updateContent(sectionId, content.id, 'listItems', newItems);
                  }}
                  placeholder="Élément de liste..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItems = (content.listItems || []).filter((_, i) => i !== index);
                    updateContent(sectionId, content.id, 'listItems', newItems);
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newItems = [...(content.listItems || []), ''];
                updateContent(sectionId, content.id, 'listItems', newItems);
              }}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} />
              <span>Ajouter un élément</span>
            </button>
          </div>
        );

      case 'TABLE':
        if (!content.tableData) return null;

        return (
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {content.tableData.headers.map((header, colIndex) => (
                    <th key={colIndex} className="p-2 border-r border-gray-300 last:border-r-0">
                      <input
                        type="text"
                        className="w-full p-1 text-center font-semibold bg-transparent"
                        value={header}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTableUpdate(sectionId, content.id, 'headers', null, colIndex, e.target.value)
                        }
                        placeholder={`En-tête ${colIndex + 1}`}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.tableData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-gray-300">
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="p-2 border-r border-gray-300 last:border-r-0">
                        <input
                          type="text"
                          className="w-full p-1 text-center bg-transparent"
                          value={cell}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleTableUpdate(sectionId, content.id, 'rows', rowIndex, colIndex, e.target.value)
                          }
                          placeholder="Cellule"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-2 bg-gray-50 flex space-x-2">
              <button
                type="button"
                onClick={() => addTableRow(sectionId, content.id)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ajouter ligne
              </button>
              <button
                type="button"
                onClick={() => addTableColumn(sectionId, content.id)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Ajouter colonne
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Créer un nouveau blog</h1>

      <div className="space-y-6">
        {/* Informations générales du blog */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Informations générales</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du blog *
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={blog.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBlog(prev => ({ ...prev, title: e.target.value }))
              }
              placeholder="Ex: RSE et développement durable..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auteur *
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={blog.author}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBlog(prev => ({ ...prev, author: e.target.value }))
                }
                placeholder="Ex: Expert RSE & SDGs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optionnel)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              value={blog.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBlog(prev => ({ ...prev, description: e.target.value }))
              }
              placeholder="Résumé du contenu du blog..."
            />
          </div>

          {/* Section pour l'upload d'image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image de couverture (optionnel)
            </label>
            <ImageUpload
              value={blog.imageUrl}
              onChange={handleImageUpload}
              onRemove={handleImageRemove}
              type="blog"
              id={`blog-${Date.now()}`}
              disabled={isLoading}
              className="w-full max-w-md"
            />
            {blog.imageUrl && (
              <p className="text-xs text-gray-500 mt-2">
                Cette image apparaîtra comme couverture de votre blog
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Sections du blog</h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Ajouter une section</span>
            </button>
          </div>

          {blog.sections.map((section, sectionIndex) => (
            <div key={section.id} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GripVertical className="text-gray-400 cursor-move" size={20} />
                  <input
                    type="text"
                    className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                    value={section.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateSection(section.id, 'title', e.target.value)
                    }
                    placeholder={`Titre de la section ${sectionIndex + 1}...`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteSection(section.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Contenus de la section */}
              <div className="space-y-4">
                {section.contents.map((content) => (
                  <div key={content.id} className="border border-gray-200 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        {content.type === 'TEXT' && 'Texte'}
                        {content.type === 'NUMBERED_LIST' && 'Liste numérotée'}
                        {content.type === 'BULLET_LIST' && 'Liste à puces'}
                        {content.type === 'TABLE' && 'Tableau'}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteContent(section.id, content.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <ContentRenderer content={content} sectionId={section.id} />
                  </div>
                ))}

                {/* Boutons d'ajout de contenu */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => addContent(section.id, 'TEXT')}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Type size={16} />
                    <span>Texte</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addContent(section.id, 'NUMBERED_LIST')}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Hash size={16} />
                    <span>Liste numérotée</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addContent(section.id, 'BULLET_LIST')}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <List size={16} />
                    <span>Liste à puces</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => addContent(section.id, 'TABLE')}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Table size={16} />
                    <span>Tableau</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {blog.sections.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Aucune section ajoutée</p>
              <button
                type="button"
                onClick={addSection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer la première section
              </button>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={!blog.title || !blog.author}
          >
            <Eye size={20} />
            <span>Prévisualiser</span>
          </button>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={!blog.title || !blog.author || isLoading}
            >
              <Save size={20} />
              <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder comme brouillon'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={!blog.title || !blog.author || isLoading}
            >
              <Send size={20} />
              <span>{isLoading ? 'Publication...' : 'Publier le blog'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de prévisualisation */}
      {showPreview && (
        <BlogPreview
          blog={blog}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default BlogCreator;