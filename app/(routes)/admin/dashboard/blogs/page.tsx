"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, Plus, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  createdAt: string;
  description?: string;
  published: boolean;
  sections: Array<{
    title: string;
  }>;
}

const BlogsListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des blogs');
      }

      const blogs = await response.json();
      setBlogs(blogs);
    } catch (err) {
      setError('Erreur lors du chargement des blogs');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      alert('Erreur de connexion');
      console.error('Erreur:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Blogs</h1>
            <p className="text-gray-600 mt-2">Gérez vos articles et publications</p>
          </div>
          <Link href="/admin/dashboard/blogs/new">
            <Button className="flex btn-primary items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={20} />
              <span>Nouveau Blog</span>
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun blog trouvé</h3>
            <p className="text-gray-500 mb-6">Commencez par créer votre premier article</p>
            <Link href="/admin/dashboard/blogs/new">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Créer mon premier blog
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      {blog.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {blog.description}
                        </p>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.published ? 'Publié' : 'Brouillon'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(blog.date || blog.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    {blog.sections.length} section{blog.sections.length > 1 ? 's' : ''}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href={`/blogs/${blog.id}`}>
                      <button className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                        <span>Voir</span>
                      </button>
                    </Link>

                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/dashboard/blogs/${blog.id}`}>
                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                          <span>Modifier</span>
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsListPage;