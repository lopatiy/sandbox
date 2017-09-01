import React from 'react';
import ArticleListItem from './ArticleListItem';
import agent from '../agent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    loadArticles: (payload) => dispatch({type: 'HOME_PAGE_LOADED', payload})
});

class ArticleList extends React.Component {
    componentDidMount() {
        this.props.loadArticles(agent.Articles.all());
    }

    render() {
        if (!this.props.articles) {
            return (
                <div className="article-preview">Loading...</div>
            );
        }

        if (this.props.articles.length === 0) {
            return (
                <div className="article-preview">
                    No articles are here... yet.
                </div>
            );
        }

        return (
            <div>
                {this.props.articles.map(article =>
                    <ArticleListItem article={article} key={article.slug}/>)}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleList));