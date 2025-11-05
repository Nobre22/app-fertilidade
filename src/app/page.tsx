"use client";

import { useState, useEffect } from "react";
import { Heart, Calendar, Users, BookOpen, Sparkles, Baby, Lock, User, Plus, Edit, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase, type Post, type Category, type Comment } from "@/lib/supabase";

type ActiveSection = 'dashboard' | 'posts' | 'categories' | 'profile';

export default function FertilCare() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Estados para dados do Supabase
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estados para formulários
  const [newPost, setNewPost] = useState({ title: '', content: '', category_id: '' });
  const [newComment, setNewComment] = useState({ content: '', post_id: '' });
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Credenciais simples para demonstração
  const validCredentials = {
    username: 'admin',
    password: '123456'
  };

  // Carregar dados do Supabase
  useEffect(() => {
    if (isAuthenticated) {
      loadCategories();
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          categories (name, description)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erro Supabase:', error);
        setPosts([]);
        return;
      }
      
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at');
      
      if (error) {
        console.error('Erro Supabase:', error);
        setComments([]);
        return;
      }
      
      setComments(data || []);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      setComments([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginData.username === validCredentials.username && 
        loginData.password === validCredentials.password) {
      setIsAuthenticated(true);
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
    setLoginError('');
    setActiveSection('dashboard');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !newPost.category_id) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          category_id: newPost.category_id,
          user_id: '00000000-0000-0000-0000-000000000001' // ID fixo para demo
        }]);

      if (error) throw error;
      
      setNewPost({ title: '', content: '', category_id: '' });
      loadPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          category_id: editingPost.category_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPost.id);

      if (error) throw error;
      
      setEditingPost(null);
      loadPosts();
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.content || !newComment.post_id) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          content: newComment.content,
          post_id: newComment.post_id,
          user_id: '00000000-0000-0000-0000-000000000001' // ID fixo para demo
        }]);

      if (error) throw error;
      
      setNewComment({ content: '', post_id: '' });
      loadComments(newComment.post_id);
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    }
  };

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              FertilCare
            </CardTitle>
            <CardDescription>
              Faça login para acessar seu companheiro de fertilidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
                  {loginError}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-2">Credenciais para teste:</p>
              <p className="text-sm text-blue-600">Usuário: <code className="bg-blue-100 px-1 rounded">admin</code></p>
              <p className="text-sm text-blue-600">Senha: <code className="bg-blue-100 px-1 rounded">123456</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
            <p className="text-sm text-gray-500">Total de posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{categories.length}</p>
            <p className="text-sm text-gray-500">Categorias ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              Comentários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{comments.length}</p>
            <p className="text-sm text-gray-500">Total de comentários</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">Nenhum post encontrado</p>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="border-l-4 border-rose-400 pl-4">
                  <h4 className="font-semibold">{post.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{post.category?.name}</Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editingPost ? editingPost.title : newPost.title}
                onChange={(e) => editingPost 
                  ? setEditingPost({ ...editingPost, title: e.target.value })
                  : setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Digite o título do post"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={editingPost ? editingPost.category_id : newPost.category_id}
                onValueChange={(value) => editingPost
                  ? setEditingPost({ ...editingPost, category_id: value })
                  : setNewPost({ ...newPost, category_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={editingPost ? editingPost.content : newPost.content}
                onChange={(e) => editingPost
                  ? setEditingPost({ ...editingPost, content: e.target.value })
                  : setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="Digite o conteúdo do post"
                rows={4}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingPost ? 'Atualizar' : 'Criar'} Post
              </Button>
              {editingPost && (
                <Button type="button" variant="outline" onClick={() => setEditingPost(null)}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500">Nenhum post encontrado</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPost(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.category?.name}</Badge>
                      <span className="text-sm text-gray-400">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setNewComment({ ...newComment, post_id: post.id });
                        loadComments(post.id);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Comentários
                    </Button>
                  </div>

                  {newComment.post_id === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <form onSubmit={handleCreateComment} className="space-y-2">
                        <Textarea
                          value={newComment.content}
                          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                          placeholder="Escreva um comentário..."
                          rows={2}
                        />
                        <Button type="submit" size="sm">
                          Comentar
                        </Button>
                      </form>
                      
                      <div className="mt-4 space-y-2">
                        {comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-50 p-3 rounded">
                            <p className="text-sm">{comment.content}</p>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderCategories = () => (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{category.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Criada em {new Date(category.created_at).toLocaleDateString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'posts':
        return renderPosts();
      case 'categories':
        return renderCategories();
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade de perfil em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  FertilCare
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Seu companheiro de fertilidade</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs px-2 py-1">
                <Baby className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Conectado </span>DB
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-7"
              >
                Sair
              </Button>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'dashboard', icon: Sparkles, label: 'Dashboard' },
                    { id: 'posts', icon: BookOpen, label: 'Posts' },
                    { id: 'categories', icon: Users, label: 'Categorias' },
                    { id: 'profile', icon: Baby, label: 'Perfil' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as ActiveSection)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-rose-100 safe-area-pb">
        <div className="grid grid-cols-4 gap-1 p-3">
          {[
            { id: 'dashboard', icon: Sparkles, label: 'Início' },
            { id: 'posts', icon: BookOpen, label: 'Posts' },
            { id: 'categories', icon: Users, label: 'Categorias' },
            { id: 'profile', icon: Baby, label: 'Perfil' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as ActiveSection)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all min-h-[60px] ${
                activeSection === item.id
                  ? 'bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600'
                  : 'text-gray-500 hover:text-rose-500'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-medium leading-tight text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}