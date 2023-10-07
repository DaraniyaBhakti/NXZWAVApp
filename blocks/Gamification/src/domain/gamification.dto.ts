export interface AssetCategories {
    id: string,
    type: string,
    attributes: {
        id: number,
        points: number,
        push_points: number,
        pin_points: number,
        blast_points: number,
        clout_changes: {
            percentage: number,
            clout_ballence: number
        }
    }
}

export interface WatchersItem {
    id: string,
    type: string,
    attributes: {
        id: number,
        user_profile_info_id: {
            id: number,
            user_name: string,
            role: string,
            level: string,
            points: number,
            profile_pic: string,
        }
        action: {
            action: number,
            points: number
        }
    }
}

export interface TransactionItem {
    id: string,
    type: string,
    attributes: {
        id: number,
        user_profile_info_id: number,
        created_at: string,
        type: {
            status: string,
            type: string,
            type_to: string,
            type_of_transaction: string
        }
    }

}

export interface ActivityFeed {
    id: string,
    type: string,
    attributes: {
        activity: UserActivity[]
    }

}

export interface UserActivity {
    count: number,
    msg: string,
    name: string,
    post_imag: string,
    profile_img: string,
    user_name: string[],
    user_pics: string[]
}

export interface UserResponse {
    id: string,
    type: string,
    attributes: {
      user_name: string,
      unlock_amount: string,
      apple_account_id: number,
      level_name: string | null,
      points: number,
      rank: number,
      profile_account_categories_id: {
        id: number,
        name: string
      },
      profile_pic: string | null,
      cover_pic: string | null
    }
  }
