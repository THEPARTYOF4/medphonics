import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from '../services/api';

interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
}

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center">Loading articles...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{new Date(article.date).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{article.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}