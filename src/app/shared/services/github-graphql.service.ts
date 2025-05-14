import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubGraphqlService {
  constructor(private _Apollo: Apollo, private _HttpClient: HttpClient) {}
  private apiUrl = 'https://api.github.com';

  private userQuery = gql`
    query GetUserData($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        repositories(first: 100) {
          totalCount
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  getUserData(username: string) {
    return this._Apollo
      .query({
        query: this.userQuery,
        variables: { username },
      })
      .pipe(
        map((result: any) => {
          const userData = result.data.user;
          return {
            totalContributions:
              userData.contributionsCollection.contributionCalendar
                .totalContributions,
            reposCount: userData.repositories.totalCount,
            totalCommitsCount: userData.repositories.nodes.reduce(
              (acc: number, repo: any) => {
                const commitCount =
                  repo.defaultBranchRef?.target?.history?.totalCount || 0;
                return acc + commitCount;
              },
              0
            ),
          };
        }),
        catchError((error) => {
          console.error('Error fetching GitHub data:', error);
          return [];
        })
      );
  }

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

  getUserRepoCount(username: string) {
    const query = gql`
      {
        user(login: "${username}") {
          repositories {
            totalCount
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
          return result.data.user.repositories.totalCount;
        })
      );
  }

  // Fetch all repositories for a user or organization
  getUserRepositories(username: string): Observable<any[]> {
    const query = gql`
      {
        user(login: "${username}") {
          repositories(first: 100) {
            nodes {
              name
              description
              isPrivate
            }
          }
        }
      }
    `;
    return this._Apollo
      .query({ query })
      .pipe(map((result: any) => result.data.user.repositories.nodes));
  }

  // Fetch latest commits count for a repository
  getLatestCommitsCount(owner: string, repo: string): Observable<number> {
    const query = gql`
      {
        repository(owner: "${owner}", name: "${repo}") {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  totalCount
                }
              }
            }
          }
        }
      }
    `;
    return this._Apollo.query({ query }).pipe(
      map((result: any) => {
        const history =
          result.data.repository?.defaultBranchRef?.target?.history;
        return history ? history.totalCount : 0;
      })
    );
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
