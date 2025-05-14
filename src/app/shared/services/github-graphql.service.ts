import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubGraphqlService {
  constructor(private _Apollo: Apollo, private _HttpClient: HttpClient) {}

  getTotalContributions(username: string) {
    const query = gql`
      {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    return this._Apollo
      .query({
        query,
      })
      .pipe(
        map((result: any) => {
          return result.data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        })
      );
  }
  private apiUrl = 'https://api.github.com';

  getUserRepoCount(username: string) {
    const url = `${this.apiUrl}/users/${username}`;
    const headers = {
      Authorization: `Bearer ${environment.githubToken}`,
    };

    return this._HttpClient.get<any>(url, { headers }).pipe(
      map((response) => {
        const publicRepos = response.public_repos;
        const privateRepos = response.total_private_repos;
        const allRepos = publicRepos + privateRepos;
        return allRepos;
      })
    );
  }

  // Fetch all repositories for a user or organization
  getUserRepositories(username: string): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    const headers = {
      Authorization: `Bearer ${environment.githubToken}`,
    };
    return this._HttpClient.get<any[]>(url, { headers });
  }

  // Fetch latest commits count for a repository
  getLatestCommitsCount(owner: string, repo: string): Observable<number> {
    const url = `${this.apiUrl}/repos/${owner}/${repo}/commits?per_page=1`;
    const headers = {
      Authorization: `Bearer ${environment.githubToken}`,
    };
    return this._HttpClient
      .get<any[]>(url, { headers })
      .pipe(map((response) => response.length));
  }

  // Fetch total latest commits count across all repositories for a user
  getTotalLatestCommitsCount(username: string): Observable<number> {
    return this.getUserRepositories(username).pipe(
      switchMap((repos) => {
        const requests = repos.map((repo) => {
          return this.getLatestCommitsCount(username, repo.name);
        });
        return forkJoin(requests).pipe(
          map((commitCounts) =>
            commitCounts.reduce((acc, count) => acc + count, 0)
          )
        );
      })
    );
  }
}
