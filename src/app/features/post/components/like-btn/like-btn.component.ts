import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Post } from '@core/models/post';
import { AuthService } from '@core/services';
import { PostService } from '@core/services/post.service';
import { IconComponent } from '@shared/components';

@Component({
    selector: 'like-btn',
    imports: [IconComponent],
    templateUrl: './like-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeBtnComponent {
    public readonly post = input.required<Post>();
    public readonly postService = inject(PostService);
    public readonly authService = inject(AuthService);
    public _isLike = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.post().likes.find(i => i._id === this.authService.authData()?._id)) {
                this._isLike.set(true);
            } else {
                this._isLike.set(false);
            }
        });
    }

    like() {
        this.postService.likePost(this.post()._id).subscribe();
    }
    unlike() {
        this.postService.unlikePost(this.post()).subscribe();
    }
}
