export async function getAvgMetrics(db, postType) {

    const query = `SELECT likes, shares, comments FROM posts WHERE type = ? ALLOW FILTERING`;

    try {
        const result = await db.execute(query, [postType]);

        const averages = result.rows.reduce((acc, row) => {
            acc.likes += row.likes;
            acc.shares += row.shares;
            acc.comments += row.comments;
            return acc;
        }, { likes: 0, shares: 0, comments: 0 });
          
        const total = result.rows.length;
        const avg_likes = averages.likes / total;
        const avg_shares = averages.shares / total;
        const avg_comments = averages.comments / total;
        
        return { total, avg_likes, avg_shares, avg_comments};

    } catch (error) {
        console.error('Error querying Astra DB:', error);
        throw error;
    }
}
  
  